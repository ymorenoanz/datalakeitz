import React from 'react';
import { withRouter } from 'react-router-dom';
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react'


class Menu extends React.Component 
{

	getNavLinkClass = (path) => 
	{
		return this.props.location.pathname === path ? 'active' : '';
	}

		render()
		{
			return (
					<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

						<a className="navbar-brand" href="Home">Repositorio ITZ</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarCollapse">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<a className="nav-link" href="Home">Inicio <span className="sr-only"></span></a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="LoadFile">Subir archivos</a>
								</li>

								<li className="nav-item">
									<a className="nav-link" href="Buscador">Buscador</a>
								</li>

								<li className="nav-item">
									<a className="nav-link" href="BuscarPalabraClave">Buscar por palabras clave</a>
								</li>

								<li>
								<AmplifySignOut/>
								</li>
							</ul>

							<br />
						</div>

					</nav>
			);
		}

		Menu = withRouter(Menu);
	};

	export default (Menu);