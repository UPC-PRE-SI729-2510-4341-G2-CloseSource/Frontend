import { Pipe, PipeTransform } from '@angular/core';
import { Proposal } from '../../proposals/models/proposal.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {
  transform(proposals: Proposal[], name: string): Proposal[] {
    if (!proposals || !name) return proposals;
    return proposals.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  }
}
