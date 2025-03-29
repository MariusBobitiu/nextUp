import { CrewMember, Departments } from '@/types/Crew'
import { Video } from '@/types/MovieDetails'
import { genres, languages, TVGenres } from './consts'

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('de-DE')

  return formatter.format(value)
}

export const categorizeByDepartment = (crew: CrewMember[]): Departments => {
  return crew.reduce((acc: Departments, member: CrewMember) => {
    const { department } = member
    if (!acc[department]) {
      acc[department] = []
    }
    acc[department].push(member)
    return acc
  }, {})
}

export const categorizeVideosByType = (
  videos: Video[]
): Map<string, Video[]> => {
  const map = new Map<string, Video[]>()
  videos.forEach((video) => {
    const { type } = video
    if (!map.has(type)) {
      map.set(type, [])
    }
    map.get(type)!.push(video)
  })
  return map
}

export const getMovieGenre = (id: number): string | null => {
  const movieGenre = genres.find((genre) => genre.id === id)
  return movieGenre ? movieGenre.name : null
}
export const getTVGenre = (id: number): string | null => {
  const tvGenre = TVGenres.find((genre) => genre.id === id)
  return tvGenre ? tvGenre.name : null
}

export const getLanguage = (shortCode: string) => {
  const language = languages.find((lang) => lang.iso_639_1 === shortCode)
  return language?.english_name
}
