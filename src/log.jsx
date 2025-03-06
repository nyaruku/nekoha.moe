import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parse } from 'date-fns';
import DOMPurify from 'dompurify';
export default function Log() {
  return (
    <>
        <Helmet>
            <title>Log</title>
        </Helmet>
        <nav class="navbar navbar-log">
            <div class="container-fluid">
                <a class="navbar-brand navbar-log" href="#">ChannelName</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav> 

        <div class="row navbar-log-grid">
        <div class="col-4">
            <div class="navbar-log-grid-left">
                <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form class="d-flex mt-3" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-8">
            <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">
            <div class="navbar-log-grid-right">
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
                <p>Sample Text</p>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}
