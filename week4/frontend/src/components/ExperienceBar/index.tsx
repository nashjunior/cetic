import React from 'react'

const ExperienceBar:React.FC = () => {
  return(
    <header className="experience-bar">
      <span>0xp</span>
        <div>
          <div style={{width: '60%'}}/>
          <span className="current-experience" style={{left: '50%'}}>0xp</span>
        </div>
      <span>0xp</span>
    </header>
  )
}

export default ExperienceBar;