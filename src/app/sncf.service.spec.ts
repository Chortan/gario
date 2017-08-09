/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SncfService } from './sncf.service';

describe('SncfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SncfService]
    });
  });

  it('should ...', inject([SncfService], (service: SncfService) => {
    expect(service).toBeTruthy();
  }));
});
