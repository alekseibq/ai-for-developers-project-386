import type { Result, BookingRichDto, CreateBookingRequest } from "@/types/generated";
import { post } from "./client";

export function createBooking(
  data: CreateBookingRequest
): Promise<Result<BookingRichDto>> {
  return post<BookingRichDto>("/bookings", data);
}
