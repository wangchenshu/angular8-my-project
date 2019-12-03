import { Query } from '@datorama/akita';
import { SessionState, SessionStore } from '../store/session.store';

export class SessionQuery extends Query<SessionState> {
  constructor(protected store: SessionStore) {
    super(store);
  }
}
