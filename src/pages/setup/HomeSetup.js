import React, { Component } from 'react'
import { LoginView, HomeView } from '../view'
import { Token } from "../../LocalStorage/getUser"
import NavbarComponent from '../../components/NavbarComponent'


export default class HomeSetup extends Component {
    render() {
        if (!Token) {
            return <LoginView />
        } else {
            return (
                <>
                    <NavbarComponent />
                    <HomeView />
                </>

            )
        }
    }
}
