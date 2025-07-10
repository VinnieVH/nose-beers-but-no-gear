import React from 'react'
import { getClassColor } from '../../utils/classColors'
import type { Member } from '../../shared/types'
import { MemberRole } from '../../shared/enums'

interface MemberCardProps {
  member: Member
  showRole?: boolean
  className?: string
}

const MemberCard = ({ member, showRole = true, className = '' }: MemberCardProps): React.JSX.Element => {
  return (
    <li className={`flex items-center bg-pandaria-paper/50 dark:bg-pandaria-primary/10 p-2 rounded-lg ${className}`}>
      <div className={`w-3 h-3 rounded-full mr-2 ${getClassColor(member.class)}`}></div>
      <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
        {member.name}
      </span>
      {showRole && (
        <span className="ml-auto text-pandaria-primary dark:text-pandaria-primaryLight text-sm">
          {member.role === MemberRole.Feeder ? '🍜 ' + member.role : member.role}
        </span>
      )}
    </li>
  )
}

export default MemberCard 