import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './captura.reducer';

export const CapturaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const capturaEntity = useAppSelector(state => state.captura.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="capturaDetailsHeading">
          <Translate contentKey="exossLivesiteApp.captura.detail.title">Captura</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{capturaEntity.id}</dd>
          <dt>
            <span id="imagem">
              <Translate contentKey="exossLivesiteApp.captura.imagem">Imagem</Translate>
            </span>
          </dt>
          <dd>
            {capturaEntity.imagem ? (
              <div>
                {capturaEntity.imagemContentType ? (
                  <a onClick={openFile(capturaEntity.imagemContentType, capturaEntity.imagem)}>
                    <img src={`data:${capturaEntity.imagemContentType};base64,${capturaEntity.imagem}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {capturaEntity.imagemContentType}, {byteSize(capturaEntity.imagem)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="data">
              <Translate contentKey="exossLivesiteApp.captura.data">Data</Translate>
            </span>
          </dt>
          <dd>{capturaEntity.data ? <TextFormat value={capturaEntity.data} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="descricao">
              <Translate contentKey="exossLivesiteApp.captura.descricao">Descricao</Translate>
            </span>
          </dt>
          <dd>{capturaEntity.descricao}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="exossLivesiteApp.captura.status">Status</Translate>
            </span>
          </dt>
          <dd>{capturaEntity.status ? 'true' : 'false'}</dd>
          <dt>
            <span id="video">
              <Translate contentKey="exossLivesiteApp.captura.video">Video</Translate>
            </span>
          </dt>
          <dd>{capturaEntity.video}</dd>
          <dt>
            <Translate contentKey="exossLivesiteApp.captura.estacao">Estacao</Translate>
          </dt>
          <dd>{capturaEntity.estacao ? capturaEntity.estacao.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/captura" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/captura/${capturaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CapturaDetail;
