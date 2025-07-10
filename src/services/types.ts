export interface OAuthTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface Fight {
  id: number
  name: string
  kill: boolean
  startTime: number
  endTime: number
}

export interface WarcraftLogsGuild {
  id: number
  name: string
  server: {
    name: string
    slug: string
    region: {
      name: string
      slug: string
    }
  }
  faction: {
    name: string
  }
}

export interface WarcraftLogsReport {
  code: string
  title: string
  owner: {
    name: string
  }
  startTime: number
  endTime: number
  zone: {
    id: number
    name: string
  }
  fights: Fight[]
}

export interface WarcraftLogsCharacter {
  name: string
  level: number
  classID: number
  server: {
    name: string
    slug: string
  }
}

export interface GraphQLResponse<T = Record<string, unknown>> {
  data: T
  errors?: Array<{ message: string }>
}

export interface GraphQLVariables {
  [key: string]: string | number | boolean | null | undefined
}