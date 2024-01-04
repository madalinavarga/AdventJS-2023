using AutoMapper;
using Server.Controllers.ViewModel.Invite;
using Server.Data.Entities;

namespace Server.AutoMapper;
    public class AutoMapper: Profile
    {
        public AutoMapper()
        {
            CreateMap<InviteUpdate, Invite>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                {
                    if (srcMember is Guid guid)
                    {
                        return guid!=Guid.Empty;
                    }

                    return srcMember!=null;
                }));
    }
    }
