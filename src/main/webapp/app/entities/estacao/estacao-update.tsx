import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IEstacao } from 'app/shared/model/estacao.model';
import { getEntity, updateEntity, createEntity, reset } from './estacao.reducer';

export const EstacaoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const estacaoEntity = useAppSelector(state => state.estacao.entity);
  const loading = useAppSelector(state => state.estacao.loading);
  const updating = useAppSelector(state => state.estacao.updating);
  const updateSuccess = useAppSelector(state => state.estacao.updateSuccess);

  const handleClose = () => {
    navigate('/estacao');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...estacaoEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...estacaoEntity,
          user: estacaoEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="exossLivesiteApp.estacao.home.createOrEditLabel" data-cy="EstacaoCreateUpdateHeading">
            <Translate contentKey="exossLivesiteApp.estacao.home.createOrEditLabel">Create or edit a Estacao</Translate>
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
                  id="estacao-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('exossLivesiteApp.estacao.nome')} id="estacao-nome" name="nome" data-cy="nome" type="text" />
              <ValidatedField
                label={translate('exossLivesiteApp.estacao.associado')}
                id="estacao-associado"
                name="associado"
                data-cy="associado"
                type="text"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.estacao.email')}
                id="estacao-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.estacao.telefone')}
                id="estacao-telefone"
                name="telefone"
                data-cy="telefone"
                type="text"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.estacao.cidade')}
                id="estacao-cidade"
                name="cidade"
                data-cy="cidade"
                type="text"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.estacao.estado')}
                id="estacao-estado"
                name="estado"
                data-cy="estado"
                type="text"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.estacao.lente')}
                id="estacao-lente"
                name="lente"
                data-cy="lente"
                type="text"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.estacao.camera')}
                id="estacao-camera"
                name="camera"
                data-cy="camera"
                type="text"
              />
              <ValidatedField label={translate('exossLivesiteApp.estacao.fov')} id="estacao-fov" name="fov" data-cy="fov" type="text" />
              <ValidatedField label={translate('exossLivesiteApp.estacao.kml')} id="estacao-kml" name="kml" data-cy="kml" type="text" />
              <ValidatedField label={translate('exossLivesiteApp.estacao.lat')} id="estacao-lat" name="lat" data-cy="lat" type="text" />
              <ValidatedField label={translate('exossLivesiteApp.estacao.lng')} id="estacao-lng" name="lng" data-cy="lng" type="text" />
              <ValidatedField label={translate('exossLivesiteApp.estacao.site')} id="estacao-site" name="site" data-cy="site" type="text" />
              <ValidatedField
                label={translate('exossLivesiteApp.estacao.ativa')}
                id="estacao-ativa"
                name="ativa"
                data-cy="ativa"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('exossLivesiteApp.estacao.pareamento')}
                id="estacao-pareamento"
                name="pareamento"
                data-cy="pareamento"
                type="text"
              />
              <ValidatedField id="estacao-user" name="user" data-cy="user" label={translate('exossLivesiteApp.estacao.user')} type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/estacao" replace color="info">
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

export default EstacaoUpdate;
