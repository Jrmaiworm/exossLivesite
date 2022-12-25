import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEstacao } from 'app/shared/model/estacao.model';
import { getEntities as getEstacaos } from 'app/entities/estacao/estacao.reducer';
import { ICaptura } from 'app/shared/model/captura.model';
import { getEntity, updateEntity, createEntity, reset } from './captura.reducer';

export const CapturaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const estacaos = useAppSelector(state => state.estacao.entities);
  const capturaEntity = useAppSelector(state => state.captura.entity);
  const loading = useAppSelector(state => state.captura.loading);
  const updating = useAppSelector(state => state.captura.updating);
  const updateSuccess = useAppSelector(state => state.captura.updateSuccess);

  const handleClose = () => {
    navigate('/captura');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getEstacaos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.data = convertDateTimeToServer(values.data);

    const entity = {
      ...capturaEntity,
      ...values,
      estacao: estacaos.find(it => it.id.toString() === values.estacao.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          data: displayDefaultDateTime(),
        }
      : {
          ...capturaEntity,
          data: convertDateTimeFromServer(capturaEntity.data),
          estacao: capturaEntity?.estacao?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="exossLivesiteApp.captura.home.createOrEditLabel" data-cy="CapturaCreateUpdateHeading">
            <Translate contentKey="exossLivesiteApp.captura.home.createOrEditLabel">Create or edit a Captura</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="captura-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedBlobField
                label={translate('exossLivesiteApp.captura.imagem')}
                id="captura-imagem"
                name="imagem"
                data-cy="imagem"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.captura.data')}
                id="captura-data"
                name="data"
                data-cy="data"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.captura.descricao')}
                id="captura-descricao"
                name="descricao"
                data-cy="descricao"
                type="text"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.captura.status')}
                id="captura-status"
                name="status"
                data-cy="status"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.captura.video')}
                id="captura-video"
                name="video"
                data-cy="video"
                type="text"
              />
              <ValidatedField
                id="captura-estacao"
                name="estacao"
                data-cy="estacao"
                label={translate('exossLivesiteApp.captura.estacao')}
                type="select"
              >
                <option value="" key="0" />
                {estacaos
                  ? estacaos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/captura" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CapturaUpdate;
