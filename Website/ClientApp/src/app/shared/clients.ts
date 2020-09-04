/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.7.0.0 (NJsonSchema v10.1.24.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
    providedIn: 'root'
})
export class AccountClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://localhost:7418";
    }

    upload(accountDump: AccountDump): Observable<string> {
        let url_ = this.baseUrl + "/api/Account";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(accountDump);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpload(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpload(<any>response_);
                } catch (e) {
                    return <Observable<string>><any>_observableThrow(e);
                }
            } else
                return <Observable<string>><any>_observableThrow(response_);
        }));
    }

    protected processUpload(response: HttpResponseBase): Observable<string> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<string>(<any>null);
    }

    get(id: string | null | undefined): Observable<AccountDump> {
        let url_ = this.baseUrl + "/api/Account?";
        if (id !== undefined && id !== null)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<AccountDump>><any>_observableThrow(e);
                }
            } else
                return <Observable<AccountDump>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<AccountDump> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AccountDump.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<AccountDump>(<any>null);
    }
}

export class AccountDump implements IAccountDump {
    artifacts?: Artifact[] | undefined;
    heroes?: Hero[] | undefined;

    constructor(data?: IAccountDump) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["artifacts"])) {
                this.artifacts = [] as any;
                for (let item of _data["artifacts"])
                    this.artifacts!.push(Artifact.fromJS(item));
            }
            if (Array.isArray(_data["heroes"])) {
                this.heroes = [] as any;
                for (let item of _data["heroes"])
                    this.heroes!.push(Hero.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AccountDump {
        data = typeof data === 'object' ? data : {};
        let result = new AccountDump();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.artifacts)) {
            data["artifacts"] = [];
            for (let item of this.artifacts)
                data["artifacts"].push(item.toJSON());
        }
        if (Array.isArray(this.heroes)) {
            data["heroes"] = [];
            for (let item of this.heroes)
                data["heroes"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IAccountDump {
    artifacts?: Artifact[] | undefined;
    heroes?: Hero[] | undefined;
}

export class Artifact implements IArtifact {
    id!: number;
    sellPrice!: number;
    price!: number;
    level!: number;
    isActivated!: boolean;
    kind?: string | undefined;
    rank?: string | undefined;
    rarity?: string | undefined;
    setKind?: string | undefined;
    isSeen!: boolean;
    failedUpgrades!: number;
    primaryBonus?: ArtifactBonus | undefined;
    secondaryBonuses?: ArtifactBonus[] | undefined;
    requiredFraction?: string | undefined;

    constructor(data?: IArtifact) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.sellPrice = _data["sellPrice"];
            this.price = _data["price"];
            this.level = _data["level"];
            this.isActivated = _data["isActivated"];
            this.kind = _data["kind"];
            this.rank = _data["rank"];
            this.rarity = _data["rarity"];
            this.setKind = _data["setKind"];
            this.isSeen = _data["isSeen"];
            this.failedUpgrades = _data["failedUpgrades"];
            this.primaryBonus = _data["primaryBonus"] ? ArtifactBonus.fromJS(_data["primaryBonus"]) : <any>undefined;
            if (Array.isArray(_data["secondaryBonuses"])) {
                this.secondaryBonuses = [] as any;
                for (let item of _data["secondaryBonuses"])
                    this.secondaryBonuses!.push(ArtifactBonus.fromJS(item));
            }
            this.requiredFraction = _data["requiredFraction"];
        }
    }

    static fromJS(data: any): Artifact {
        data = typeof data === 'object' ? data : {};
        let result = new Artifact();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["sellPrice"] = this.sellPrice;
        data["price"] = this.price;
        data["level"] = this.level;
        data["isActivated"] = this.isActivated;
        data["kind"] = this.kind;
        data["rank"] = this.rank;
        data["rarity"] = this.rarity;
        data["setKind"] = this.setKind;
        data["isSeen"] = this.isSeen;
        data["failedUpgrades"] = this.failedUpgrades;
        data["primaryBonus"] = this.primaryBonus ? this.primaryBonus.toJSON() : <any>undefined;
        if (Array.isArray(this.secondaryBonuses)) {
            data["secondaryBonuses"] = [];
            for (let item of this.secondaryBonuses)
                data["secondaryBonuses"].push(item.toJSON());
        }
        data["requiredFraction"] = this.requiredFraction;
        return data; 
    }
}

export interface IArtifact {
    id: number;
    sellPrice: number;
    price: number;
    level: number;
    isActivated: boolean;
    kind?: string | undefined;
    rank?: string | undefined;
    rarity?: string | undefined;
    setKind?: string | undefined;
    isSeen: boolean;
    failedUpgrades: number;
    primaryBonus?: ArtifactBonus | undefined;
    secondaryBonuses?: ArtifactBonus[] | undefined;
    requiredFraction?: string | undefined;
}

export class ArtifactBonus implements IArtifactBonus {
    kind?: string | undefined;
    isAbsolute!: boolean;
    value!: number;
    enhancement!: number;
    level!: number;

    constructor(data?: IArtifactBonus) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.kind = _data["kind"];
            this.isAbsolute = _data["isAbsolute"];
            this.value = _data["value"];
            this.enhancement = _data["enhancement"];
            this.level = _data["level"];
        }
    }

    static fromJS(data: any): ArtifactBonus {
        data = typeof data === 'object' ? data : {};
        let result = new ArtifactBonus();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["kind"] = this.kind;
        data["isAbsolute"] = this.isAbsolute;
        data["value"] = this.value;
        data["enhancement"] = this.enhancement;
        data["level"] = this.level;
        return data; 
    }
}

export interface IArtifactBonus {
    kind?: string | undefined;
    isAbsolute: boolean;
    value: number;
    enhancement: number;
    level: number;
}

export class Hero implements IHero {
    id!: number;
    typeId!: number;
    grade?: string | undefined;
    level!: number;
    experience!: number;
    fullExperience!: number;
    locked!: boolean;
    inStorage!: boolean;
    artifacts?: number[] | undefined;

    constructor(data?: IHero) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.typeId = _data["typeId"];
            this.grade = _data["grade"];
            this.level = _data["level"];
            this.experience = _data["experience"];
            this.fullExperience = _data["fullExperience"];
            this.locked = _data["locked"];
            this.inStorage = _data["inStorage"];
            if (Array.isArray(_data["artifacts"])) {
                this.artifacts = [] as any;
                for (let item of _data["artifacts"])
                    this.artifacts!.push(item);
            }
        }
    }

    static fromJS(data: any): Hero {
        data = typeof data === 'object' ? data : {};
        let result = new Hero();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["typeId"] = this.typeId;
        data["grade"] = this.grade;
        data["level"] = this.level;
        data["experience"] = this.experience;
        data["fullExperience"] = this.fullExperience;
        data["locked"] = this.locked;
        data["inStorage"] = this.inStorage;
        if (Array.isArray(this.artifacts)) {
            data["artifacts"] = [];
            for (let item of this.artifacts)
                data["artifacts"].push(item);
        }
        return data; 
    }
}

export interface IHero {
    id: number;
    typeId: number;
    grade?: string | undefined;
    level: number;
    experience: number;
    fullExperience: number;
    locked: boolean;
    inStorage: boolean;
    artifacts?: number[] | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}