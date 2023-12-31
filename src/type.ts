export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: EventOrganizer | string
}

export interface EventOrganizer{
  id: number
  name: string
}
  
export interface OrganizerItem {
  id: number
  name: string
  address: string
}