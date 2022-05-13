import {Getter, inject, Provider} from '@loopback/core';
import {Request} from '@loopback/rest';
import {CacheBindings} from '../keys';
import {Cache, CacheCheckFn, CacheStrategy} from '../types';

export class CacheCheckProvider implements Provider<CacheCheckFn> {
  constructor(
    @inject.getter(CacheBindings.CACHE_STRATEGY)
    readonly getCacheStrategy: Getter<CacheStrategy>,
  ) {}

  value(): CacheCheckFn {
    return request => this.action(request);
  }

  async action(request: Request): Promise<Cache | undefined> {
    const cacheStrategy = await this.getCacheStrategy();

    if (!cacheStrategy) {
      return undefined;
    }

    return cacheStrategy.check(request.path);
  }
}
