import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './estacao.reducer';

export const EstacaoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const estacaoEntity = useAppSelector(state => state.estacao.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="estacaoDetailsHeading">
          <Translate contentKey="exossLivesiteApp.estacao.detail.title">Estacao</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="exossLivesiteApp.estacao.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.nome}</dd>
          <dt>
            <span id="associado">
              <Translate contentKey="exossLivesiteApp.estacao.associado">Associado</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.associado}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="exossLivesiteApp.estacao.email">Email</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.email}</dd>
          <dt>
            <span id="telefone">
              <Translate contentKey="exossLivesiteApp.estacao.telefone">Telefone</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.telefone}</dd>
          <dt>
            <span id="cidade">
              <Translate contentKey="exossLivesiteApp.estacao.cidade">Cidade</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.cidade}</dd>
          <dt>
            <span id="estado">
              <Translate contentKey="exossLivesiteApp.estacao.estado">Estado</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.estado}</dd>
          <dt>
            <span id="lente">
              <Translate contentKey="exossLivesiteApp.estacao.lente">Lente</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.lente}</dd>
          <dt>
            <span id="camera">
              <Translate contentKey="exossLivesiteApp.estacao.camera">Camera</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.camera}</dd>
          <dt>
            <span id="fov">
              <Translate contentKey="exossLivesiteApp.estacao.fov">Fov</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.fov}</dd>
          <dt>
            <span id="kml">
              <Translate contentKey="exossLivesiteApp.estacao.kml">Kml</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.kml}</dd>
          <dt>
            <span id="lat">
              <Translate contentKey="exossLivesiteApp.estacao.lat">Lat</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.lat}</dd>
          <dt>
            <span id="lng">
              <Translate contentKey="exossLivesiteApp.estacao.lng">Lng</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.lng}</dd>
          <dt>
            <span id="site">
              <Translate contentKey="exossLivesiteApp.estacao.site">Site</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.site}</dd>
          <dt>
            <span id="ativa">
              <Translate contentKey="exossLivesiteApp.estacao.ativa">Ativa</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.ativa ? 'true' : 'false'}</dd>
          <dt>
            <span id="pareamento">
              <Translate contentKey="exossLivesiteApp.estacao.pareamento">Pareamento</Translate>
            </span>
          </dt>
          <dd>{estacaoEntity.pareamento}</dd>
          <dt>
            <Translate contentKey="exossLivesiteApp.estacao.user">User</Translate>
          </dt>
          <dd>{estacaoEntity.user ? estacaoEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/estacao" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/estacao/${estacaoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EstacaoDetail;
