import React from 'react'
import { Link } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'
import './styles.css'

type PageHeaderProps = {
    title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({title, children}) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>

                <img src={logoImg} alt=""/>
            </div>

            <div className="header-content">
                <strong>
                    {title}
                </strong>
            {children}
            </div>
        </header>
    )
}

export default PageHeader;