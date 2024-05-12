import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValueDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
