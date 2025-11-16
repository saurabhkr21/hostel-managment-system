import Icon from "@/components/ui/AppIcon";

const InstitutionalBranding = () => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="relative group">
          <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl animate-float">
            <Icon
              name="BuildingOffice2Icon"
              size={36}
              className="text-white drop-shadow-sm"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-pulse">
            <Icon name="CheckIcon" size={16} className="text-white" />
          </div>
          {/* Decorative elements */}
          <div
            className="absolute -top-1 -left-1 w-4 h-4 bg-blue-200 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-6 -right-3 w-3 h-3 bg-indigo-200 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      {/* Institution Name */}
      <h1 className="text-4xl font-extrabold text-gradient mb-4 tracking-tight">
        HostelHub
      </h1>
      <p className="text-xl text-slate-600 mb-8 font-medium">
        Professional Management System
      </p>

      {/* Trust Indicators */}
      <div className="flex justify-center items-center space-x-6 mb-8">
        <div className="flex items-center space-x-2 bg-white/60 px-4 py-3 rounded-xl border border-slate-200/60 hover:bg-white transition-all duration-300 hover-lift">
          <Icon name="ShieldCheckIcon" size={20} className="text-green-600" />
          <span className="text-sm text-slate-700 font-medium">
            Secure Login
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-white/60 px-4 py-3 rounded-xl border border-slate-200/60 hover:bg-white transition-all duration-300 hover-lift">
          <Icon name="LockClosedIcon" size={20} className="text-green-600" />
          <span className="text-sm text-slate-700 font-medium">
            Data Protected
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-white/60 px-4 py-3 rounded-xl border border-slate-200/60 hover:bg-white transition-all duration-300 hover-lift">
          <Icon name="AcademicCapIcon" size={20} className="text-green-600" />
          <span className="text-sm text-slate-700 font-medium">
            Edu Certified
          </span>
        </div>
      </div>

      {/* Institution Info */}
      <div className="bg-white/70 rounded-2xl p-6 shadow-lg border border-slate-200/50 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-center space-x-2 bg-blue-50 px-4 py-3 rounded-lg">
            <Icon name="UsersIcon" size={18} className="text-blue-600" />
            <span className="text-slate-700 font-semibold">500+ Students</span>
          </div>
          <div className="flex items-center justify-center space-x-2 bg-indigo-50 px-4 py-3 rounded-lg">
            <Icon name="ClockIcon" size={18} className="text-indigo-600" />
            <span className="text-slate-700 font-semibold">24/7 Support</span>
          </div>
          <div className="flex items-center justify-center space-x-2 bg-purple-50 px-4 py-3 rounded-lg">
            <Icon name="GlobeAltIcon" size={18} className="text-purple-600" />
            <span className="text-slate-700 font-semibold">Multi-Campus</span>
          </div>
        </div>

        {/* Additional features */}
        <div className="mt-6 pt-4 border-t border-slate-200/50">
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <Icon name="BoltIcon" size={14} className="text-amber-500" />
              <span className="font-medium">AI-Powered</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="CloudIcon" size={14} className="text-blue-500" />
              <span className="font-medium">Cloud Sync</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon
                name="DevicePhoneMobileIcon"
                size={14}
                className="text-indigo-500"
              />
              <span className="font-medium">Mobile Ready</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalBranding;
