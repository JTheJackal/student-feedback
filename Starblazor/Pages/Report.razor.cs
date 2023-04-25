using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Starblazor.Shared;
using Starblazor.Shared.Model;

namespace Starblazor.Pages
{
    public partial class Report
    {

        [Inject]
        public ReportState reportState { get; set; }

        private ReportModel report;

        protected override void OnInitialized()
        {
            base.OnInitialized();
            report = reportState.value;
        }
    }
}