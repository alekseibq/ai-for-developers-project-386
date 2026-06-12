from app.domain.result import Success
from app.repositories.meeting_type_repository import MeetingTypeRepository


class ListAllMeetingTypeUseCase:
    def __init__(self, repo: MeetingTypeRepository):
        self._repo = repo

    async def __call__(self):
        types = await self._repo.find_all()
        return Success(data=types)
