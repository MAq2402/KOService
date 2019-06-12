﻿using System;
using System.Collections.Generic;
using System.Text;

namespace KOService.Domain.Enums
{
    public enum RepairStatus
    {
        Open,
        Priced,
        PricingAccepted,
        InProgress,
        Canceled,
        Finished
    }
}
