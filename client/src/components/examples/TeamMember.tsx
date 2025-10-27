import TeamMember from '../TeamMember'

export default function TeamMemberExample() {
  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto p-6">
      <TeamMember
        name="Dr. Patricia Smith"
        role="Founder & CEO"
        bio="Former Army Engineer with 20+ years of experience in organizational change and leadership development."
        initials="PS"
      />
      <TeamMember
        name="Michael Johnson"
        role="Chief Technology Officer"
        bio="Technology leader specializing in enterprise software and data analytics for change management."
        initials="MJ"
      />
      <TeamMember
        name="Sarah Williams"
        role="Head of Client Success"
        bio="Dedicated to ensuring organizations achieve transformational results through our platform."
        initials="SW"
      />
    </div>
  )
}
