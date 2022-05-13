import {Getter, inject, Provider} from '@loopback/core';
import {Request} from '@loopback/rest';
import {CacheBindings} from '../keys';
import {CacheSetFn, CacheStrategy} from '../types';

export class CacheSetProvider implements Provider<CacheSetFn> {
  constructor(
    @inject.getter(CacheBindings.CACHE_STRATEGY)
    readonly getCacheStrategy: Getter<CacheStrategy>,
  ) {}

  value(): CacheSetFn {
    return (request, result) => this.action(request, result);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async action(request: Request, result: any): Promise<void> {
    const cacheStrategy = await this.getCacheStrategy();

    if (!cacheStrategy || !result) {
      return;
    }

    await cacheStrategy.set(request.path, result);
  }
}
