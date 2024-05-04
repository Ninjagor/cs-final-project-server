#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

int main() {
    char path[MAX_PATH];
    if (GetModuleFileName(NULL, path, MAX_PATH) == 0) {
        fprintf(stderr, "Error getting executable path\n");
        return 1;
    }

    // Change the working directory to the directory containing the executable
    char *lastBackslash = strrchr(path, '\\');
    if (lastBackslash != NULL) {
        *lastBackslash = '\0';
        SetCurrentDirectory(path);
    }

    chdir("..");
    // Now you can run your commands
    system("npm install");
    system("npm run build-application");
    system("npm start &");
    system("ssh -R 80:localhost:3000 us.serveo.net");

    return 0;
}