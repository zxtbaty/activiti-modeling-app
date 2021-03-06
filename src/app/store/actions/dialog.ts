 /*!
 * @license
 * Copyright 2018 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Action } from '@ngrx/store';
import { TemplateRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { EntityDialogPayload } from 'ama-sdk';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export class OpenDialogAction<T> implements Action {
    readonly type = OPEN_DIALOG;
    constructor(
        public dialogContent: ComponentType<T> | TemplateRef<T>,
        public dialogConfig?: MatDialogConfig
    ) {}
}

export const CLOSE_ALL_DIALOGS = 'CLOSE_ALL_DIALOGS';
export class CloseAllDialogsAction implements Action {
    readonly type = CLOSE_ALL_DIALOGS;
    constructor() {}
}

export const OPEN_ENTITY_DIALOG = 'OPEN_ENTITY_DIALOG';
export class OpenEntityDialogAction implements Action {
    readonly type = OPEN_ENTITY_DIALOG;
    constructor(public payload: EntityDialogPayload) {}
}
