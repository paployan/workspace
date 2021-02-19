import { IProject } from '../interfaces'


export const projectData: IProject[] = process.browser ?
    JSON.parse(localStorage.getItem('projects') || '[]')
    : []
