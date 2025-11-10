import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const abbreviationsToMonth = monthAbbreviations.reduce((ac, month, i) => (ac[month] = i, ac), {} as {[k: string]: number})

export const getMonthYear = (date: Date) => `${monthAbbreviations[date.getMonth()]} ${date.getFullYear()}`

