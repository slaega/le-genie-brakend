export class LeaveContributorCommand {
    constructor(
        public readonly postId: string,
        public readonly userId: string
    ) {}
}
