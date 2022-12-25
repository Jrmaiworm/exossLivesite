import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEstacao } from 'app/shared/model/estacao.model';
import { getEntities } from './estacao.reducer';

export const Estacao = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const estacaoList = useAppSelector(state => state.estacao.entities);
  const loading = useAppSelector(state => state.estacao.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="estacao-heading" data-cy="EstacaoHeading">
        <Translate contentKey="exossLivesiteApp.estacao.home.title">Estações</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="exossLivesiteApp.estacao.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/estacao/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="exossLivesiteApp.estacao.home.createLabel">Create new Estacao</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {estacaoList && estacaoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.associado">Associado</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.telefone">Telefone</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.cidade">Cidade</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.estado">Estado</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.lente">Lente</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.camera">Camera</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.fov">Fov</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.kml">Kml</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.lat">Lat</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.lng">Lng</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.site">Site</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.ativa">Ativa</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.pareamento">Pareamento</Translate>
                </th>
                <th>
                  <Translate contentKey="exossLivesiteApp.estacao.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {estacaoList.map((estacao, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/estacao/${estacao.id}`} color="link" size="sm">
                      {estacao.id}
                    </Button>
                  </td>
                  <td>{estacao.nome}</td>
                  <td>{estacao.associado}</td>
                  <td>{estacao.email}</td>
                  <td>{estacao.telefone}</td>
                  <td>{estacao.cidade}</td>
                  <td>{estacao.estado}</td>
                  <td>{estacao.lente}</td>
                  <td>{estacao.camera}</td>
                  <td>{estacao.fov}</td>
                  <td>{estacao.kml}</td>
                  <td>{estacao.lat}</td>
                  <td>{estacao.lng}</td>
                  <td>{estacao.site}</td>
                  <td>{estacao.ativa ? 'true' : 'false'}</td>
                  <td>{estacao.pareamento}</td>
                  <td>{estacao.user ? estacao.user.id : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/estacao/${estacao.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/estacao/${estacao.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/estacao/${estacao.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="exossLivesiteApp.estacao.home.notFound">No Estações found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Estacao;
