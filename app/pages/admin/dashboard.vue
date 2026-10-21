namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Message;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'user' => [
                'name' => $request->user()?->name ?? 'Daniel',
                'email' => $request->user()?->email ?? 'daniel@example.com',
            ],
            'stats' => [
                'projects' => Project::count() ?: 12,
                'skills' => Skill::count() ?: 18,
                'messages' => Message::count() ?: 4,
                'unreadMessages' => Message::where('is_read', false)->count() ?: 2,
                'visitors' => '1.5K',
            ],
            'recentMessages' => Message::latest()->take(4)->get(),
            'activities' => []
        ]);
    }
}