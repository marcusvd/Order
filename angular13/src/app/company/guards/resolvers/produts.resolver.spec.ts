import { TestBed } from '@angular/core/testing';

import { ProdutsResolver } from './produts.resolver';

describe('ProdutsResolver', () => {
  let resolver: ProdutsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProdutsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
