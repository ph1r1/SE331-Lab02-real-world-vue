import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { AuctionItem } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAuctionItems(perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
    return apiClient.get<AuctionItem[]>('/auction-items?_limit=' + perPage + '&_page=' + page)
  },
//   getEventById(id: number): Promise<AxiosResponse<EventItem>> {
//     return apiClient.get<EventItem>('events/' + id.toString())
//   },
//   saveEvent(event: EventItem): Promise<AxiosResponse<EventItem>> {
//     return apiClient.post<EventItem>('/events', event)
//   },
  getAuctionItemsByKeyword(
    keyword: string,
    perPage: number,
    page: number
  ): Promise<AxiosResponse<AuctionItem[]>> {
    return apiClient.get<AuctionItem[]>(
      '/auction-items?description=' + keyword + '&_limit=' + perPage + '&_page=' + page
    )
  }
}
