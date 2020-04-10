import { TestBed } from '@angular/core/testing';

import { ChannelServiceService } from './channel-service.service';

describe('ChannelServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelServiceService = TestBed.get(ChannelServiceService);
    expect(service).toBeTruthy();
  });
});
