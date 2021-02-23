import React from 'react';
import styles from '../../styles/components/Profile.module.css'

const Profile: React.FC = () => {
    return (
        <div className={styles.profileContainer}>
            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2002&q=80" alt="Imagem de Perfil"/>

            <div>
                <strong>Nash</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    )
}

export default Profile