import {Component, ProviderMap} from '@loopback/core';
import {CacheBindings} from './keys';
import {
  CacheCheckProvider,
  CacheMetadataProvider,
  CacheSetProvider,
} from './providers';

export class CacheComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {
      [CacheBindings.CACHE_CHECK_ACTION.key]: CacheCheckProvider,
      [CacheBindings.CACHE_SET_ACTION.key]: CacheSetProvider,
      [CacheBindings.METADATA.key]: CacheMetadataProvider,
    };
  }
}
