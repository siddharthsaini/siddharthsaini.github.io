import type { ComponentType } from 'react'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  component: ComponentType
}

export interface EducationEntry {
  institution: string
  location: string
  degree: string
  period: string
}

export interface WorkEntry {
  company: string
  role: string
  period: string
}

export interface ProjectEntry {
  name: string
  description: string
  url?: string
  linkLabel?: string
  codeUrl?: string
}
