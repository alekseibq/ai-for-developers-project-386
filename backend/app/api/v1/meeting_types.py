from fastapi import APIRouter, Depends

from app.api.v1.dto import CreateMeetingTypeRequest
from app.domain.result import Success, Failure
from app.usecases.list_all_meeting_type_use_case import ListAllMeetingTypeUseCase
from app.usecases.create_meeting_type_use_case import CreateMeetingTypeUseCase
from app.api.v1.mappers import meeting_type_obj_to_dto
from app.infrastructure.di import (
    list_all_meeting_type_usecase,
    create_meeting_type_usecase,
)

router = APIRouter(tags=["meeting-types"])


@router.get("/api/v1/meeting-types")
async def get_meeting_types(
    use_case: ListAllMeetingTypeUseCase = Depends(list_all_meeting_type_usecase),
):
    result = await use_case()
    if result.type == "failure":
        return result
    return Success(data=[meeting_type_obj_to_dto(t) for t in result.data])


@router.post("/api/v1/meeting-types")
async def create_meeting_type(
    body: CreateMeetingTypeRequest,
    use_case: CreateMeetingTypeUseCase = Depends(create_meeting_type_usecase),
):
    result = await use_case(
        name=body.name,
        description=body.description,
        duration_minutes=body.duration_minutes,
    )
    if result.type == "failure":
        return result
    return Success(data=meeting_type_obj_to_dto(result.data))
