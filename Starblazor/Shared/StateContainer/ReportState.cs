using Starblazor.Shared.Model;
namespace Starblazor.Shared
{
    public class ReportState
    {
        public ReportModel? value { get; set; }
        public event Action? OnStateChange;
        public void SetValue(ReportModel value)
        { 
            this.value = value;
            NotifyStateChanged();
        }
        private void NotifyStateChanged() => OnStateChange?.Invoke();
    }
}