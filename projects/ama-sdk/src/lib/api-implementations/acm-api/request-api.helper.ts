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
import { from, Observable } from 'rxjs';
import { AppConfigService, AlfrescoApiService, StorageService } from '@alfresco/adf-core';

export interface RequestApiHelperOptions {
    pathParams?: { [key: string]: any} ;
    queryParams?: { [key: string]: any} ;
    headerParams?: { [key: string]: any} ;
    formParams?: { [key: string]: any} ;
    bodyParam?: { [key: string]: any} ;
    authNames?: string[];
    contentTypes?: string[];
    accepts?: string[];
    returnType?: any;
    contextRoot?: string;
    responseType?: 'arraybuffer'|'blob'|'document'|'json'|'text';
}

function getDefaultOptions(): RequestApiHelperOptions {
    return {
        pathParams: {},
        queryParams: {},
        headerParams: {},
        formParams: {},
        bodyParam: {},
        authNames: [],
        contentTypes: ['application/json'],
        accepts: ['application/json'],
        returnType: {'String': 'String'}
    };
}

@Injectable()
export class RequestApiHelper {

    constructor(
        private appConfig: AppConfigService,
        private storageService: StorageService,
        private alfrescoApiService: AlfrescoApiService
    ) {}

    private get api() {
        return this.alfrescoApiService.getInstance().oauth2Auth;
    }

    private buildUrl(endPoint: string): string {
        const trimSlash = (str: string) => str.replace(/^\/|\/$/g, '');
        const path = '/' + trimSlash(endPoint);

        let host;
        if (this.storageService.hasItem('bpmHost')) {
            host = this.storageService.getItem('bpmHost');
        } else {
            host = trimSlash(this.appConfig.get('bpmHost'));
        }

        return `${host}${path}`;
    }

    public get<T>(endPoint: string, overriddenOptions?: RequestApiHelperOptions) {
        return this.request<T>('GET', endPoint, overriddenOptions);
    }

    public post<T>(endPoint: string, overriddenOptions?: RequestApiHelperOptions) {
        return this.request<T>('POST', endPoint, overriddenOptions);
    }

    public put<T>(endPoint: string, overriddenOptions?: RequestApiHelperOptions) {
        return this.request<T>('PUT', endPoint, overriddenOptions);
    }

    public delete<T>(endPoint: string, overriddenOptions?: RequestApiHelperOptions) {
        return this.request<T>('DELETE', endPoint, overriddenOptions);
    }

    private request<T>(httpMethod: string, endPoint: string, overriddenOptions?: RequestApiHelperOptions): Observable<T> {

        const options = {
            ...getDefaultOptions(),
            ...overriddenOptions
        };

        const {
            pathParams,
            queryParams,
            headerParams,
            formParams,
            bodyParam,
            authNames,
            contentTypes,
            accepts,
            returnType,
            contextRoot,
            responseType
        } = options;

        return from(this.api.callCustomApi(
            this.buildUrl(endPoint),
            httpMethod,
            pathParams,
            queryParams,
            headerParams,
            formParams,
            bodyParam,
            authNames,
            contentTypes,
            accepts,
            returnType,
            contextRoot,
            responseType
        ));
    }
}
