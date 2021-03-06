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

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AppConfigService } from '@alfresco/adf-core';
import { AuthTokenProcessorService } from 'ama-sdk';
import { Store } from '@ngrx/store';
import { AmaState, AmaAuthenticationService } from 'ama-sdk';

@Injectable()
export class AmaRoleGuard implements CanActivate {
    isAllowed = false;

    constructor(
        private appConfig: AppConfigService,
        private authService: AuthTokenProcessorService,
        protected store: Store<AmaState>,
        protected amaAuthService: AmaAuthenticationService) { }

    canActivate(): boolean {
        const roles = this.appConfig.get<string[]>('roles');
        roles.forEach(role => {
            if (this.authService.hasRole(role)) {
                this.isAllowed = true;
            }
        });

        if (!this.isAllowed) {
            this.amaAuthService.logout();
        }
       return true;
    }
}
