import type { OrganizerItem } from '@/type'
import type { EventOrganizer } from '@/type'

import apiClient from './AxiosClient'
import type {  AxiosResponse } from 'axios'

export default {
  getOrganizer(perPage: number, page: number): Promise<AxiosResponse<OrganizerItem[]>> {
    return apiClient.get<OrganizerItem[]>('/organizers?_limit=' + perPage + '&_page=' + page)
  },
  getOrganizerById(id: number): Promise<AxiosResponse<OrganizerItem>> {
    return apiClient.get<OrganizerItem>('organizers/' + id.toString())
  },
  saveOrganizer(organizer: OrganizerItem): Promise<AxiosResponse<OrganizerItem>> {
    return apiClient.post<OrganizerItem>('/organizers', organizer)
  },
  getOrganizers(): Promise<AxiosResponse<EventOrganizer[]>> {
    return apiClient.get<EventOrganizer[]>(`/organizers`)
  }
}
