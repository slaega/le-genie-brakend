import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { INVITATION_REPOSITORY } from '#shared/constantes/inject-token';
import { InvitationRepository } from '#domain/repository/invitation.repository';
import { RefusedInvitationCommand } from '#applications/commands/invitation/refused-invitation.command';

@CommandHandler(RefusedInvitationCommand)
export class RefusedInvitationHandler
    implements ICommandHandler<RefusedInvitationCommand>
{
    constructor(
        @Inject(INVITATION_REPOSITORY)
        private readonly invitationRepository: InvitationRepository
    ) {}

    async execute(command: RefusedInvitationCommand) {
        const invitation = await this.invitationRepository.getInvitationById(
            command.invitationId
        );
        if (!invitation) {
            throw new Error('Invitation not found');
        }
        return this.invitationRepository.removeInvitation(invitation.id);
    }
}
