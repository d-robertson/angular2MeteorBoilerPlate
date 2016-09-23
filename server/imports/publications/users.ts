import { Meteor } from 'meteor/meteor';
import { Parties } from '../../../both/collections/parties.collection';

Meteor.publish('uninvited', function(partyId: string){
  let party = Parties.findOne(partyId);

  if(!party){
    throw new Meteor.Error('404 no such party');
  }

  return Meteor.users.find({
    _id: {
      $nin: party.invited || [],
      $ne: this.userId
    }
  });
});
