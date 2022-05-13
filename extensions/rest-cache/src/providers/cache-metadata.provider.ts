import {Constructor, inject, Provider} from '@loopback/context';
import {CoreBindings} from '@loopback/core';
import {CacheMetadata, getCacheMetadata} from '../decorators';

export class CacheMetadataProvider
  implements Provider<CacheMetadata | undefined>
{
  constructor(
    @inject(CoreBindings.CONTROLLER_CLASS, {optional: true})
    private readonly controllerClass: Constructor<{}>,
    @inject(CoreBindings.CONTROLLER_METHOD_NAME, {optional: true})
    private readonly methodName: string,
  ) {}

  value(): CacheMetadata | undefined {
    if (!this.controllerClass || !this.methodName) return;
    return getCacheMetadata(this.controllerClass, this.methodName);
  }
}
