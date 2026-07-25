import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Marquee from './Marquee'

interface SkillItem {
  title: string
}

const LUA_TOKENS = [
  'local',
  'function ... end',
  'if / then / else',
  'RegisterCommand',
  'TriggerServerEvent',
  'TriggerClientEvent',
  'AddEventHandler',
  'RegisterNetEvent',
]

const FRAMEWORK_TOKENS = [
  'ESX',
  'QBCore',
  'Qbox',
  'ox_lib',
  'Jobs',
  'Inventory',
  'Banking',
  'Gangs',
]

export default function TickerStrip() {
  const { t } = useTranslation()
  const location = useLocation()

  let items: string[]
  if (location.pathname === '/lua') {
    items = LUA_TOKENS
  } else if (location.pathname === '/frameworks') {
    items = FRAMEWORK_TOKENS
  } else {
    items = (t('skills.items', { returnObjects: true }) as SkillItem[]).map((i) => i.title)
  }

  return <Marquee items={items} key={location.pathname} />
}
