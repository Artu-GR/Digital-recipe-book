import { TestBed } from '@angular/core/testing';

import { AvatarPhotoService } from './avatar-photo.service';

describe('AvatarPhotoService', () => {
  let service: AvatarPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
