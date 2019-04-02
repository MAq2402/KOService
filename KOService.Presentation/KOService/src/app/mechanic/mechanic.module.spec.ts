import { MechanicModule } from './mechanic.module';

describe('MechanicModule', () => {
  let mechanicModule: MechanicModule;

  beforeEach(() => {
    mechanicModule = new MechanicModule();
  });

  it('should create an instance', () => {
    expect(mechanicModule).toBeTruthy();
  });
});
