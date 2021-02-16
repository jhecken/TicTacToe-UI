import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  const configMock = {
    api: {
      fems: {
        base: "string",
        uri: {
          posts: "string",
          comments: "string",
          image: ''
        }
      },
      auth:{
        base: '',
        uri:{
          login: '',
          register: ''
        }
      }
    }
  }

  const configPath = environment.config;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return config object', () => {
    let req: TestRequest;

    service.get().subscribe((res) => {
      expect(res).toBe(configMock);
    })

    req = httpTestingController.expectOne(configPath);
    req.flush(configMock);
  })
});
