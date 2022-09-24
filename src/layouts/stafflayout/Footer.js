import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className="main-footer" style={{ backgroundColor: "#0000" }}>
                <strong>Copyright © 2017- {new Date().getFullYear()} <a href="https://zictech-ng.com">{window.companyName}</a>. </strong>
                All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                    <b>Developed by</b> Zictech Technologies
                </div>
            </footer>

        </>
    )
}
