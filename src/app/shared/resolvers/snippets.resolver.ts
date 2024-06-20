import { Injector } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { SnippetService } from '../services/snippet.service'

const injector = Injector.create({
  providers: [{ provide: SnippetService, useClass: SnippetService, deps: [] }]
})

export const snippetsResolver: ResolveFn<any> = (route, state) => {
  const snippetService = injector.get(SnippetService)
  return snippetService.getUserSnippets(route.params['userId'])
}
