from collections.abc import AsyncGenerator
import pytest_asyncio
from testcontainers.mongodb import MongoDbContainer
from httpx import AsyncClient, ASGITransport

from app.main import app
from app.infrastructure.database import Database


@pytest_asyncio.fixture(scope="session")
async def mongodb_container():
    container = MongoDbContainer("mongo:7")
    try:
        container.start()
        yield container
    finally:
        container.stop()


@pytest_asyncio.fixture
async def test_client(mongodb_container) -> AsyncGenerator[AsyncClient, None]:
    uri = mongodb_container.get_connection_url()
    import os
    os.environ["MONGO_URI"] = uri

    await Database.connect()
    await _clean_db()
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client
    await Database.disconnect()


async def _clean_db():
    db = Database.get_db()
    collection_names = await db.list_collection_names()
    for collection_name in collection_names:
        await db[collection_name].delete_many({})
